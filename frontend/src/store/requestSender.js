import create from "zustand";
import { axiosInstance } from "../lib/axios";

export const useBikeStore = create((set) => ({
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

	submitRegistration: async (profile) => {
		try {
			const { ownerDetails, bikeDetails } = useBikeStore.getState();

			const formData = new FormData();
			formData.append(
				"fullName",
				ownerDetails.isOwner ? profile.name : ownerDetails.fullName
			);
			formData.append(
				"dob",
				ownerDetails.isOwner && profile?.dob ? profile.dob : ownerDetails.dob
			);
			formData.append("address", ownerDetails.address);
			formData.append(
				"mobile",
				ownerDetails.isOwner ? profile.mobile : ownerDetails.mobile
			);
			formData.append(
				"email",
				ownerDetails.isOwner ? profile.email : ownerDetails.email
			);
			if (ownerDetails.ownerPhoto)
				formData.append("ownerPhoto", ownerDetails.ownerPhoto);

			formData.append("brand", bikeDetails.brand);
			formData.append("model", bikeDetails.model);
			formData.append("fuelType", bikeDetails.fuelType);
			formData.append("color", bikeDetails.color);
			formData.append("mileage", bikeDetails.mileage);
			if (bikeDetails.rcCertificate)
				formData.append("rcCertificate", bikeDetails.rcCertificate);
			if (bikeDetails.pollutionCertificate)
				formData.append(
					"pollutionCertificate",
					bikeDetails.pollutionCertificate
				);
			if (bikeDetails.insuranceCertificate)
				formData.append(
					"insuranceCertificate",
					bikeDetails.insuranceCertificate
				);
			if (bikeDetails.frontView)
				formData.append("frontView", bikeDetails.frontView);
			if (bikeDetails.backView)
				formData.append("backView", bikeDetails.backView);
			if (bikeDetails.rightView)
				formData.append("rightView", bikeDetails.rightView);
			if (bikeDetails.leftView)
				formData.append("leftView", bikeDetails.leftView);

			// Axios POST request with form data
			const response = await axiosInstance.post("/api/bikes", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			alert("Bike registration submitted!");
			return response.data;
		} catch (error) {
			console.error("Failed to submit bike registration:", error);
			alert("Failed to submit bike registration.");
			throw error;
		}
	},
}));
