import { getSkills } from "../actions/getSkills";
import { CosmicDashboard } from "@/components/dashboard/CosmicDashboard";

export default async function DashboardPage() {
    const skills = await getSkills();

    return <CosmicDashboard skills={skills} />;
}
