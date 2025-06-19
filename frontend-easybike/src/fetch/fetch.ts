import { axiosInstance } from "../lib/axios";
import type { RentalRequestType, DemographicData } from "../Types/types";

// admin
export async function getUserByUID(uid: string) {
	try {
		const response = await axiosInstance.post("/know_user", { uid });
		return response.data;
	} catch (error) {
		console.error("Error fetching user by UID:", error);
		return null;
	}
}

export async function acceptBikeRequest(id: string, pricePerHour: number) {
	try {
		const response = await axiosInstance.post(`/admin/accept-bike/${id}`, {
			pricePerHour,
		});
		return response.data;
	} catch (error) {
		console.error("Error accepting bike request:", error);
		throw error;
	}
}

export async function rejectBikeRequest(id: string) {
	try {
		const response = await axiosInstance.post(`/admin/reject-bike/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error rejecting bike request:", error);
		throw error;
	}
}

export async function getAllBikes() {
	try {
		const response = await axiosInstance.get("/bikes");
		return response.data;
	} catch (error) {
		console.error("Error fetching all bikes:", error);
		return { count: 0, bikes: [] };
	}
}

export async function deleteBike(id: string) {
	try {
		const response = await axiosInstance.delete(`/bikes/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error deleting bike:", error);
		throw error;
	}
}

// customer

export async function getBikesByOwnerId(ownerId: string) {
	try {
		const response = await axiosInstance.post("/get-user-bikes", { ownerId });
		return response.data; // Array of bike objects
	} catch (error) {
		console.error("Error fetching bikes by owner ID:", error);
		return [];
	}
}

export async function makeBikeOnline(
	id: string,
	data: {
		latitude: number;
		longitude: number;
		startTime: string;
		endTime: string;
	}
) {
	try {
		const response = await axiosInstance.post(`/bikes/${id}/go-online`, data);
		return response.data;
	} catch (error) {
		console.error("Error making bike online:", error);
		throw error;
	}
}

export async function makeBikeOffline(id: string) {
	try {
		const response = await axiosInstance.post(`/bikes/${id}/go-offline`);
		return response.data;
	} catch (error) {
		console.error("Error making bike offline:", error);
		throw error;
	}
}

interface GetNearbyBikesParams {
	latitude: number;
	longitude: number;
	page?: number;
	limit?: number;
}

import type { Bike } from "../Types/types";

export async function getNearbyBikes({
	latitude,
	longitude,
	page = 1,
	limit = 10,
	customerId,
}: GetNearbyBikesParams & { customerId: string }): Promise<{
	bikes: (Bike & { distanceInKm: number })[];
}> {
	try {
		const response = await axiosInstance.post("/bikes/nearby", {
			latitude,
			longitude,
			page,
			limit,
			customerId, // ✅ send to backend
		});

		console.log("Nearby bikes fetched:", response.data);

		return response.data;
	} catch (error) {
		console.error("Error fetching nearby bikes:", error);
		throw error;
	}
}

interface OrderBikeParams {
	bikeId: string;
	customerId: string;
	startTime: string; // e.g. ISO string or "2025-06-18T10:00:00"
	endTime: string; // same format as startTime
}

export async function orderBike({
	bikeId,
	customerId,
	startTime,
	endTime,
}: OrderBikeParams): Promise<{ message: string; requestId: string }> {
	try {
		const response = await axiosInstance.post("/bike/request", {
			bikeId,
			customerId,
			startTime,
			endTime,
		});
		console.log("Bike order response:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error ordering bike:", error);
		throw error;
	}
}

export async function getOrdersByCustomer(customerId: string) {
	try {
		const response = await axiosInstance.get(`/customer/${customerId}`);
		console.log("Orders by customer:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching customer orders:", error);
		throw error;
	}
}

export async function getOrdersByOwner(ownerId: string) {
	try {
		const response = await axiosInstance.get(`/owner/${ownerId}`);
		console.log("Orders by owner:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching owner orders:", error);
		throw error;
	}
}

export async function getBikeBrandModelById(bikeId: string) {
	try {
		const response = await axiosInstance.get(`/bike/${bikeId}/brand-model`);
		console.log("Bike brand/model:", response.data);
		return response.data; // { brand, model }
	} catch (error) {
		console.error("Error fetching bike brand/model:", error);
		throw error;
	}
}

export async function handleRentalRequestAction(
	requestId: string,
	action: "accept" | "reject"
) {
	try {
		const response = await axiosInstance.post(
			`/rental-request/${requestId}/action`,
			{ action }
		);
		console.log(`Request ${action}ed:`, response.data);
		return response.data;
	} catch (error) {
		console.error(`Error trying to ${action} request:`, error);
		throw error;
	}
}

export async function getAllUsers() {
	try {
		const response = await axiosInstance.get("/all-users");
		console.log("Fetched all users:", response.data);
		return response.data.users; // if your backend sends { users: [...] }
	} catch (error) {
		console.error("Error fetching all users:", error);
		throw error;
	}
}

export async function deleteUser(uid: string) {
	try {
		const response = await axiosInstance.delete("/delete-user", {
			data: { uid },
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error("Failed to delete user:", error);
		throw error;
	}
}

export async function getTotalUsers(): Promise<number> {
	try {
		const response = await axiosInstance.get("/total-users");
		console.log("Total users:", response.data.totalUsers);
		return response.data.totalUsers;
	} catch (error) {
		console.error("Failed to fetch total users:", error);
		throw error;
	}
}

export async function getRentalStats(): Promise<{
	totalRequests: number;
	thisMonth: number;
	lastMonth: number;
	growthPercent: number;
}> {
	try {
		const response = await axiosInstance.get("/rental-stats");
		console.log("Rental stats:", response.data);
		return response.data;
	} catch (error) {
		console.error("Failed to fetch rental stats:", error);
		throw error;
	}
}

export async function getMonthlySales(): Promise<number[]> {
	try {
		const res = await axiosInstance.get("/monthly-sales");
		return res.data.sales;
	} catch (err) {
		console.error("Error fetching monthly sales:", err);
		return new Array(12).fill(0);
	}
}

export async function getCustomerDemographics(): Promise<DemographicData[]> {
	try {
		const res = await axiosInstance.get("/demographics");
		return res.data.demographics;
	} catch (err) {
		console.error("Error fetching customer demographics:", err);
		return [];
	}
}

export async function getLastFiveRentalRequests(): Promise<
	RentalRequestType[]
> {
	try {
		const res = await axiosInstance.get("/rental-requests/recent");
		return res.data.data;
	} catch (err) {
		console.error("Error fetching last 5 rental requests:", err);
		return [];
	}
}

export async function getAllRentalRequests(): Promise<RentalRequestType[]> {
	try {
		const res = await axiosInstance.get("/rental-requests/all");
		return res.data.data;
	} catch (err) {
		console.error("Error fetching all rental requests:", err);
		return [];
	}
}
