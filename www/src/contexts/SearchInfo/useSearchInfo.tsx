import { useContext } from "react";
import SearchInfoContext from "./SearchInfoContext";

const useSearchInfo = () => useContext(SearchInfoContext);

export default useSearchInfo;
