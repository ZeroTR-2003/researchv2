export type Coords = { lat: number; lng: number };
export type Annotation = { label: string; description: string; position: [number, number, number] };
export type Landmark = {
  slug: string;
  title: string;
  shortDescription: string;
  glbExterior: string;
  tour360Url?: string;
  coords: Coords;
  gallery: string[];
  facts: { year?: number; type?: string } & Record<string, string | number | undefined>;
  annotations?: Annotation[];
};

import data from "@/data/landmarks.json" assert { type: "json" };

export const landmarks: Landmark[] = data as unknown as Landmark[];

export function getAllLandmarks(): Landmark[] {
  return landmarks;
}

export function getLandmarkBySlug(slug: string): Landmark | undefined {
  return landmarks.find((l) => l.slug === slug);
}
