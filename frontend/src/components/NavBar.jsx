import {Link} from "react-router"
import {ClipboardPenIcon, PlusIcon} from "lucide-react"
const NavBar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10"> 
        <div className="mx-auto max-w-6xl p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-5xl font-light text-primary font-serif tracking-wider relative">
                <span className="absolute -left-6 top-1/2 h-12 w-1 bg-primary transform -translate-y-1/2"></span>
                Target75
              </h1>
                <div className="flex items-center gap-4">
                    <Link to={"/addSubject"} className="btn btn-primary">
                    <PlusIcon className="size-5"/>
                    <span>New Subject</span>
                    </Link>
                    <Link to={"/manageSubject"} className="btn btn-primary">
                    <ClipboardPenIcon className="size-5"/>
                    <span>Manage</span>
                    </Link>
                </div>
            </div>
        </div>
    </header>
  );
}

export default NavBar;