import { create } from "zustand";
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

	submitRegistration: async (firebase) => {
		try {
			const { ownerDetails, bikeDetails } = useBikeStore.getState();

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
			if (bikeDetails.rcCertificate) {
				const url = await firebase.fileUpload(
					bikeDetails.rcCertificate,
					ownerDetails.email,
					true
				);
				formData.append("rcCertificate", url);
			}

			if (bikeDetails.pollutionCertificate) {
				const url = await firebase.fileUpload(
					bikeDetails.pollutionCertificate,
					ownerDetails.email,
					true
				);
				formData.append("pollutionCertificate", url);
			}

			if (bikeDetails.insuranceCertificate) {
				const url = await firebase.fileUpload(
					bikeDetails.insuranceCertificate,
					ownerDetails.email,
					true
				);
				formData.append("insuranceCertificate", url);
			}

			if (bikeDetails.frontView) {
				const url = await firebase.fileUpload(
					bikeDetails.frontView,
					ownerDetails.email,
					true
				);
				formData.append("frontView", url);
			}

			if (bikeDetails.backView) {
				const url = await firebase.fileUpload(
					bikeDetails.backView,
					ownerDetails.email,
					true
				);
				formData.append("backView", url);
			}

			if (bikeDetails.rightView) {
				const url = await firebase.fileUpload(
					bikeDetails.rightView,
					ownerDetails.email,
					true
				);
				formData.append("rightView", url);
			}

			if (bikeDetails.leftView) {
				const url = await firebase.fileUpload(
					bikeDetails.leftView,
					ownerDetails.email,
					true
				);
				formData.append("leftView", url);
			}

			const response = await axiosInstance.post("/req/bike_req", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			console.log(response.data);
			// toast.success("Done! Submitted Request!");
		} catch (error) {
			console.error("Failed to submit bike registration:", error);
			alert("Failed to submit bike registration.");
			throw error;
		}
	},
}));
