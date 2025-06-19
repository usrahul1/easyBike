import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { FirebaseContextType } from "../context/Firebase";

interface OwnerDetails {
	fullName: string;
	dob: string;
	address: string;
	mobile: string;
	email: string;
	ownerPhoto: File | null;
}

interface BikeDetails {
	brand: string;
	model: string;
	fuelType: string;
	color: string;
	mileage: string;
	pricePerHour: string;
	rcCertificate: File | null;
	pollutionCertificate: File | null;
	insuranceCertificate: File | null;
	frontView: File | null;
	backView: File | null;
	rightView: File | null;
	leftView: File | null;
}

interface BikeStore {
	ownerDetails: OwnerDetails;
	bikeDetails: BikeDetails;
	userId: string; // 👈 new

	setUserId: (id: string) => void; // 👈 new
	setOwnerDetails: <K extends keyof OwnerDetails>(
		field: K,
		value: OwnerDetails[K]
	) => void;
	setBikeDetails: <K extends keyof BikeDetails>(
		field: K,
		value: BikeDetails[K]
	) => void;

	submitRegistration: (firebase: FirebaseContextType) => Promise<void>;
}

export const useBikeStore = create<BikeStore>((set, get) => ({
	userId: "",

	setUserId: (id) =>
		set(() => ({
			userId: id,
		})),

	ownerDetails: {
		fullName: "",
		dob: "",
		address: "",
		mobile: "",
		email: "",
		ownerPhoto: null,
	},
	bikeDetails: {
		brand: "",
		model: "",
		fuelType: "",
		color: "",
		mileage: "",
		pricePerHour: "",
		rcCertificate: null,
		pollutionCertificate: null,
		insuranceCertificate: null,
		frontView: null,
		backView: null,
		rightView: null,
		leftView: null,
	},

	setOwnerDetails: (field, value) =>
		set((state) => ({
			ownerDetails: { ...state.ownerDetails, [field]: value },
		})),

	setBikeDetails: (field, value) =>
		set((state) => ({
			bikeDetails: { ...state.bikeDetails, [field]: value },
		})),

	submitRegistration: async (firebase: FirebaseContextType) => {
		try {
			const { ownerDetails, bikeDetails } = get();

			const formData = new FormData();

			formData.append("fullName", ownerDetails.fullName);
			formData.append("dob", ownerDetails.dob);
			formData.append("address", ownerDetails.address);
			formData.append("mobile", ownerDetails.mobile);
			formData.append("email", ownerDetails.email);
			formData.append("pricePerHour", bikeDetails.pricePerHour);
			formData.append("ownerId", get().userId);

			// Upload owner photo
			if (ownerDetails.ownerPhoto) {
				const url = await firebase.fileUpload(
					ownerDetails.ownerPhoto,
					ownerDetails.email,
					true
				);
				if (!url) throw new Error("Owner photo upload failed");
				formData.append("ownerPhoto", url);
			}

			// Add bike details
			formData.append("brand", bikeDetails.brand);
			formData.append("model", bikeDetails.model);
			formData.append("fuelType", bikeDetails.fuelType);
			formData.append("color", bikeDetails.color);
			formData.append("mileage", bikeDetails.mileage);

			// Helper to upload & append
			const uploadAndAppend = async (
				file: File | null,
				key: string
			): Promise<void> => {
				if (!file) return;
				const url = await firebase.fileUpload(file, ownerDetails.email, true);
				if (!url) throw new Error(`${key} upload failed`);
				formData.append(key, url);
			};

			await uploadAndAppend(bikeDetails.rcCertificate, "rcCertificate");
			await uploadAndAppend(
				bikeDetails.pollutionCertificate,
				"pollutionCertificate"
			);
			await uploadAndAppend(
				bikeDetails.insuranceCertificate,
				"insuranceCertificate"
			);
			await uploadAndAppend(bikeDetails.frontView, "frontView");
			await uploadAndAppend(bikeDetails.backView, "backView");
			await uploadAndAppend(bikeDetails.rightView, "rightView");
			await uploadAndAppend(bikeDetails.leftView, "leftView");

			// Send to backend
			const response = await axiosInstance.post("/bike_req", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			console.log(response.data);
		} catch (error: any) {
			console.error("Failed to submit bike registration:", error);
			alert(`Failed to submit bike registration: ${error.message}`);
			throw error;
		}
	},
}));
