
import Conversations from "./conversations";
import Logout from "./logout";
import SearchInput from "./searchinput";

const Sidebar=()=>{
    return(
        <div className="border border-slate-500 p-4 flex flex-col">
            <SearchInput/>
            <div className="divider px-3"></div>
            <Conversations/>
            <Logout/>
        </div>
    )
}

export default Sidebar;


//start
// import Conversations from "./conversations";
// import Logout from "./logout";
// import SearchInput from "./searchinput";

// const Sidebar=()=>{
//     return(
//         <div className="border border-slate-500 p-4 flex flex-col">
//             <SearchInput/>
//             <div className="divider px-3"></div>
//             <Conversations/>
//             <Logout/>
//         </div>
//     )
// }

// export default Sidebar;