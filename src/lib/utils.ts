import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};
function findNearestZipCode(lat, lon, zipData) {
	let nearestZip = null;
	let minDistance = Infinity;

	zipData.forEach((data) => {
		const distance = haversine(lat, lon, data.lat, data.lon);
		if (distance < minDistance) {
			minDistance = distance;
			nearestZip = data.zip;
		}
	});

	return nearestZip;
}
function haversine(lat1, lon1, lat2, lon2) {
	const R = 6371; // Radius of the Earth in kilometers
	const dLat = ((lat2 - lat1) * Math.PI) / 180;
	const dLon = ((lon2 - lon1) * Math.PI) / 180;
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos((lat1 * Math.PI) / 180) *
			Math.cos((lat2 * Math.PI) / 180) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c; // Distance in kilometers
}
function parseCSV(csvText) {
	const rows = csvText.split('\n');
	const data = [];

	// Loop through each row, skip the header, and split by commas
	for (let i = 1; i < rows.length; i++) {
		const cols = rows[i].split(',').map((val) => val.trim());

		// Skip empty rows
		if (cols.length !== 3 || !cols[0]) continue;

		const zip = cols[0];
		const lat = parseFloat(cols[1]);
		const lon = parseFloat(cols[2]);

		data.push({ zip, lat, lon });
	}

	console.log(data);
	return data;
}

// Fetch the CSV file and parse it
async function loadZipData() {
	try {
		const response = await fetch('/zip.csv');
		console.log(response);
		if (!response.ok) {
			throw new Error('Failed to fetch zip data.');
		}
		const csvText = await response.text();
		const data = parseCSV(csvText);
		if (data.length === 0) {
			throw new Error('Parsed zip data is empty.');
		}
		console.log('Zip Data Loaded:', data);
		return data;
	} catch (error) {
		console.error('Error loading or parsing CSV:', error);
		throw error;
	}
}

export async function getLocation() {
	if (!navigator.geolocation) {
		throw new Error('Geolocation is not supported by this browser.');
	}

	try {
		const position = await new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, (error) => {
				let errorMessage = 'Unknown error';
				switch (error.code) {
					case 1:
						errorMessage = 'Permission denied by user.';
						break;
					case 2:
						errorMessage = 'Position unavailable.';
						break;
					case 3:
						errorMessage = 'Request timed out.';
						break;
				}
				reject(new Error(`${errorMessage}`));
			});
		});

		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;

		// Load zip data
		const zipData = await loadZipData();

		// Find nearest zip code
		const zipCode = findNearestZipCode(latitude, longitude, zipData);
		console.log('Nearest Zip Code:', zipCode);

		return zipCode || '';
	} catch (error) {
		console.error('Error in getLocation:', error.message);
		throw error; // Rethrow for calling code to handle
	}
}
