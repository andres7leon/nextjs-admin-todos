import { TabBar } from "@/components"
import { cookies } from "next/headers"

export const metadata = {
  title: "Cookies",
  description: "Data of cookies",
}

export default function CookiesPage(){

  const cookiesStore = cookies();
  const cookieTab = cookiesStore.get('selectedTab')?.value ?? '1';


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      
      <div className="flex flex-col">
        <span>
          <TabBar currentTab={ +cookieTab} />
        </span>
      </div>
    </div>
  )
}
