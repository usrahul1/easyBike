export interface BikeRequest {
	_id: string;
	ownerId: string;
	fullName: string;
	dob: string;
	address: string;
	mobile: string;
	email: string;
	ownerPhoto: string;
	brand: string;
	model: string;
	fuelType: "Petrol" | "Electric";
	color: string;
	mileage: number;
	rcCertificate: string;
	pollutionCertificate: string;
	insuranceCertificate: string;
	frontView: string;
	backView: string;
	rightView: string;
	leftView: string;
	pricePerHour: number;
	createdAt: string;
}

export interface Bike {
	_id: string;
	brand: string;
	model: string;
	fuelType: "Petrol" | "Electric";
	color: string;
	mileage: number;
	pricePerHour: number;
	isOnline: boolean;
	isRented: boolean;
	ownerId: string;
	createdAt: string;

	// Document URLs
	rcCertificate?: string;
	pollutionCertificate?: string;
	insuranceCertificate?: string;

	// Images
	frontView?: string;
	backView?: string;
	rightView?: string;
	leftView?: string;

	// Optional location
	location?: {
		latitude?: number;
		longitude?: number;
		address?: string;
		city?: string;
		state?: string;
		zipCode?: string;
	};

	// Optional internal Mongo field
	__v?: number;
}

export type RentalRequestType = {
	_id: string;
	bikeId: any; // You can replace 'any' with your Bike type if available
	customerId: string;
	ownerId: string;
	startTime: string;
	endTime: string;
	totalPrice: number;
	basePrice: number;
	status: "pending" | "accepted" | "rejected";
	requestedAt: string;
};

export interface DemographicData {
	country: string;
	count: number;
}
