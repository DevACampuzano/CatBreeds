interface Weight {
  imperial: string;
  metric: string;
}

interface CatBreed {
  id: string;
  name: string;
  origin: string;
  intelligence: number;
  reference_image_id: string;
  description: string;
  temperament: string;
  life_span: string;
  weight: Weight;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  hypoallergenic: number;
}

interface CatBreedImage {
  id: string;
  url: string;
  breeds: CatBreed[];
  width: number;
  height: number;
}
