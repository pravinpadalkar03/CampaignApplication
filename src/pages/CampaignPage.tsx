import { useState } from "react";
import type { Dayjs } from "dayjs";
import CampaignFilters from "../Components/CampaignFilters"
import CampgainList from "../Components/CampgainList"


function CampaignPage() {
    const [searchText, setSearchText] = useState<string>('');
    const [dateRange, setDateRange] = useState<[Dayjs | null, null | Dayjs] | null>(null);
    return (
        <>
            <CampaignFilters setDateRange={setDateRange} setSearchText={setSearchText} />
            <CampgainList dateRange={dateRange} searchText={searchText} />
        </>
    )
}

export default CampaignPage
