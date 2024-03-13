export interface Risk {
  risk_id: number;
  risk_category: string;
  hazards: string[];
  risks: string[];
  mitigation_status: boolean;
  pre_mitigation_risk_score: number;
  post_mitigation_risk_score: number;
  barriers: string[];
}
