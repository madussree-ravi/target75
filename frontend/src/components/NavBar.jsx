import {Link} from "react-router"
import {ClipboardPenIcon, PlusIcon} from "lucide-react"
const NavBar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10"> 
        <div className="mx-auto max-w-6xl px-4 py-3 sm:p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-primary font-serif tracking-wider relative">
                <span className="absolute -left-4 sm:-left-6 top-1/2 h-6 sm:h-8 md:h-10 lg:h-12 w-1 bg-primary transform -translate-y-1/2"></span>
                Target75
              </h1>
                <div className="flex items-center gap-2 sm:gap-4">
                    <Link to={"/addSubject"} className="btn btn-primary">
                    <PlusIcon className="size-5"/>
                    <span className="hidden xs:inline">New Subject</span>
                    </Link>
                    <Link to={"/manageSubject"} className="btn btn-primary">
                    <ClipboardPenIcon className="size-5"/>
                    <span className="hidden xs:inline">Manage</span>
                    </Link>
                </div>
            </div>
        </div>
    </header>
  );
}

export default NavBar;