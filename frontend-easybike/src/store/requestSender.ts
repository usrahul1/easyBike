import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

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
	rcCertificate: File | null;
	pollutionCertificate: File | null;
	insuranceCertificate: File | null;
	frontView: File | null;
	backView: File | null;
	rightView: File | null;
	leftView: File | null;
}

interface Firebase {
	fileUpload: (file: File, email: string, flag: boolean) => Promise<string>; // returns uploaded file URL
}

interface BikeStore {
	ownerDetails: OwnerDetails;
	bikeDetails: BikeDetails;

	setOwnerDetails: <K extends keyof OwnerDetails>(
		field: K,
		value: OwnerDetails[K]
	) => void;

	setBikeDetails: <K extends keyof BikeDetails>(
		field: K,
		value: BikeDetails[K]
	) => void;

	submitRegistration: (firebase: Firebase) => Promise<void>;
}

export const useBikeStore = create<BikeStore>((set, get) => ({
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

	submitRegistration: async (firebase) => {
		try {
			const { ownerDetails, bikeDetails } = get();

			const formData = new FormData();
			formData.append("fullName", ownerDetails.fullName);
			formData.append("dob", ownerDetails.dob);
			formData.append("address", ownerDetails.address);
			formData.append("mobile", ownerDetails.mobile);
			formData.append("email", ownerDetails.email);

			if (ownerDetails.ownerPhoto) {
				const url = await firebase.fileUpload(
					ownerDetails.ownerPhoto,
					ownerDetails.email,
					true
				);
				formData.append("ownerPhoto", url);
			}

			formData.append("brand", bikeDetails.brand);
			formData.append("model", bikeDetails.model);
			formData.append("fuelType", bikeDetails.fuelType);
			formData.append("color", bikeDetails.color);
			formData.append("mileage", bikeDetails.mileage);

			const uploadAndAppend = async (
				file: File | null,
				key: string
			): Promise<void> => {
				if (!file) return;
				const url = await firebase.fileUpload(file, ownerDetails.email, true);
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

			const response = await axiosInstance.post("/req/bike_req", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			console.log(response.data);
		} catch (error) {
			console.error("Failed to submit bike registration:", error);
			alert("Failed to submit bike registration.");
			throw error;
		}
	},
}));
