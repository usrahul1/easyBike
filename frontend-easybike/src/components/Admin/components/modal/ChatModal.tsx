import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { X, Phone, PhoneOff, Mic, MicOff } from "lucide-react";
import { axiosInstance } from "../../../../lib/axios";

const socket = io("http://localhost:3000", {
	withCredentials: true,
});

type MessageType = {
	roomId: string;
	senderId: string;
	receiverId: string;
	message: string;
	timestamp: string;
};

const ChatModal = ({
	roomId,
	currentUserId,
	peerId,
	onClose,
}: {
	roomId: string;
	currentUserId: string;
	peerId: string;
	onClose: () => void;
}) => {
	const [messages, setMessages] = useState<MessageType[]>([]);
	const [input, setInput] = useState("");
	const [callStatus, setCallStatus] = useState<"idle" | "calling" | "in-call">(
		"idle"
	);
	const [isMuted, setIsMuted] = useState(false);
	const [incomingCall, setIncomingCall] = useState<null | {
		from: string;
		offer: RTCSessionDescriptionInit;
		audio: HTMLAudioElement;
	}>(null);

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const localStream = useRef<MediaStream | null>(null);
	const peerConnection = useRef<RTCPeerConnection | null>(null);

	useEffect(() => {
		socket.emit("register-owner", currentUserId);

		axiosInstance
			.get(`/messages/${roomId}`)
			.then((res) => setMessages(res.data))
			.catch((err) => console.error("❌ Failed to load messages:", err));

		const handleReceiveMessage = (msg: MessageType) => {
			if (msg.roomId === roomId) {
				setMessages((prev) => [...prev, msg]);
			}
		};

		socket.on("receive-message", handleReceiveMessage);

		socket.on("call-made", async ({ offer, from }) => {
			const audio = new Audio("/sounds/ringtone.mp3");
			audio.loop = true;
			audio.play();

			setIncomingCall({ from, offer, audio });
		});

		socket.on("answer-made", async ({ answer }) => {
			if (peerConnection.current) {
				await peerConnection.current.setRemoteDescription(
					new RTCSessionDescription(answer)
				);
				setCallStatus("in-call");
			}
		});

		socket.on("ice-candidate", ({ candidate }) => {
			if (peerConnection.current && candidate) {
				peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
			}
		});

		return () => {
			socket.off("receive-message", handleReceiveMessage);
			socket.off("call-made");
			socket.off("answer-made");
			socket.off("ice-candidate");
			endCall();
		};
	}, [roomId, currentUserId]);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const sendMessage = () => {
		if (!input.trim()) return;

		const newMessage: MessageType = {
			roomId,
			senderId: currentUserId,
			receiverId: peerId,
			message: input,
			timestamp: new Date().toISOString(),
		};

		socket.emit("send-message", newMessage);
		setMessages((prev) => [...prev, newMessage]);
		setInput("");
	};

	const startCall = async () => {
		setCallStatus("calling");
		await setupPeer(false, peerId);

		if (peerConnection.current) {
			const offer = await peerConnection.current.createOffer();
			await peerConnection.current.setLocalDescription(offer);
			socket.emit("call-user", { to: peerId, offer });
		}
	};

	const setupPeer = async (isAnswering: boolean, otherId: string) => {
		peerConnection.current = new RTCPeerConnection();
		console.log(isAnswering);
		peerConnection.current.onicecandidate = (event) => {
			if (event.candidate) {
				socket.emit("ice-candidate", {
					to: otherId,
					candidate: event.candidate,
				});
			}
		};

		peerConnection.current.ontrack = (event) => {
			const remoteAudio = document.getElementById(
				"remote-audio"
			) as HTMLAudioElement;
			if (remoteAudio) {
				remoteAudio.srcObject = event.streams[0];
				remoteAudio.play();
			}
		};

		localStream.current = await navigator.mediaDevices.getUserMedia({
			audio: true,
		});

		localStream.current.getTracks().forEach((track) => {
			peerConnection.current?.addTrack(track, localStream.current!);
		});
	};

	const endCall = () => {
		localStream.current?.getTracks().forEach((track) => track.stop());
		peerConnection.current?.close();
		peerConnection.current = null;
		setCallStatus("idle");
		setIsMuted(false);
	};

	const toggleMute = () => {
		const audioTracks = localStream.current?.getAudioTracks();
		if (audioTracks && audioTracks.length > 0) {
			audioTracks[0].enabled = !audioTracks[0].enabled;
			setIsMuted(!audioTracks[0].enabled);
		}
	};

	const handleAcceptCall = async () => {
		if (!incomingCall) return;

		incomingCall.audio.pause();
		incomingCall.audio.currentTime = 0;
		await setupPeer(true, incomingCall.from);

		if (peerConnection.current) {
			await peerConnection.current.setRemoteDescription(
				new RTCSessionDescription(incomingCall.offer)
			);
			const answer = await peerConnection.current.createAnswer();
			await peerConnection.current.setLocalDescription(answer);
			socket.emit("make-answer", { to: incomingCall.from, answer });
			setCallStatus("in-call");
		}
		setIncomingCall(null);
	};

	const handleDeclineCall = () => {
		if (!incomingCall) return;
		incomingCall.audio.pause();
		incomingCall.audio.currentTime = 0;
		setIncomingCall(null);
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
			<div className="bg-white text-black p-4 w-full max-w-md rounded-xl relative">
				{/* Incoming Call Popup */}
				{incomingCall && (
					<div className="absolute inset-0 bg-black bg-opacity-70 z-50 flex flex-col items-center justify-center rounded-xl">
						<p className="text-white text-lg mb-4">📞 Incoming Call</p>
						<div className="flex gap-4">
							<button
								onClick={handleAcceptCall}
								className="bg-green-500 px-4 py-2 rounded text-white"
							>
								Accept
							</button>
							<button
								onClick={handleDeclineCall}
								className="bg-red-500 px-4 py-2 rounded text-white"
							>
								Decline
							</button>
						</div>
					</div>
				)}

				<div className="flex justify-between items-center mb-2">
					<h2 className="text-lg font-semibold">Chat</h2>
					<div className="flex gap-2 items-center">
						{callStatus === "in-call" && (
							<>
								<button
									onClick={toggleMute}
									title="Mute/Unmute"
									className="p-1 bg-yellow-500 text-white rounded-full"
								>
									{isMuted ? <MicOff size={18} /> : <Mic size={18} />}
								</button>
								<button
									onClick={endCall}
									title="End Call"
									className="p-1 bg-red-600 text-white rounded-full"
								>
									<PhoneOff size={18} />
								</button>
							</>
						)}
						{callStatus === "idle" && (
							<button
								onClick={startCall}
								title="Start Call"
								className="p-1 bg-green-600 text-white rounded-full"
							>
								<Phone size={18} />
							</button>
						)}
						<button onClick={onClose} className="p-1">
							<X />
						</button>
					</div>
				</div>

				{callStatus !== "idle" && (
					<p className="text-sm text-center mb-2">
						{callStatus === "calling" ? "Calling…" : "In Call"}
					</p>
				)}

				<div className="h-60 overflow-y-auto border p-2 rounded mb-2">
					{messages.map((msg, i) => (
						<div
							key={i}
							className={`text-sm p-2 rounded mb-1 max-w-[85%] break-words ${
								msg.senderId === currentUserId
									? "bg-blue-100 text-right ml-auto"
									: "bg-gray-200"
							}`}
						>
							<div>{msg.message}</div>
							<div className="text-xs text-gray-500 mt-1">
								{new Date(msg.timestamp).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</div>
						</div>
					))}
					<div ref={messagesEndRef} />
				</div>

				<div className="flex gap-2">
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="flex-grow border rounded px-2 py-1"
						placeholder="Type message..."
					/>
					<button
						onClick={sendMessage}
						className="bg-blue-600 text-white px-3 py-1 rounded"
					>
						Send
					</button>
				</div>

				<audio id="remote-audio" autoPlay hidden />
			</div>
		</div>
	);
};

export default ChatModal;
