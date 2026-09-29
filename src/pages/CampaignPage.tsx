import { useState } from "react";
import type { Dayjs } from "dayjs";
import CampaignFilters from "../Components/CampaignFilters"
import CampgainList from "../Components/CampgainList"


function CampaignPage() {
    const [searchText] = useState<string>('');
    const [dateRange] = useState<[Dayjs | null, null | Dayjs] | null>(null);
    return (
        <>
            <CampaignFilters />
            <CampgainList dateRange={dateRange} searchText={searchText} />
        </>
    )
}

export default CampaignPage
