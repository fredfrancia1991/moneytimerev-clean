export type Groupe =
  | "Revenus"
  | "Besoins pour vivre"
  | "Plaisirs et loisirs"
  | "Liberté financière"
  | "Ignoré";

export interface Mouvement {
  id: number;
  nom: string;
  montant: number;
  groupe: Groupe;
  mois: string; // YYYY-MM
}

export const groupes: Groupe[] = [
  "Revenus",
  "Besoins pour vivre",
  "Plaisirs et loisirs",
  "Liberté financière",
  "Ignoré",
];
