import { getServerSession } from "next-auth";
import { WidgetItem } from "../../components";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {


  const session = await getServerSession(authOptions);


  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">        
        <WidgetItem title="usurio conectado ServerSide">
          <h5 className="text-gray-500">
            {
              JSON.stringify(session.user || '')
            }
          </h5>
        </WidgetItem>
      </div>  
    </>
  );
}