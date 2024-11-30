export default function CmsMenu() {


    return (
        <div className="w-fit h-fit flex flex-row justify-center items-center text-white gap-3">
            <h2>Menu:</h2>
            <ul className="w-full h-fit flex flex-row justify-center items-center gap-3">
                <li><button>Courses</button></li>
                <li><button>Posts</button></li>
                <li><button>Projects</button></li>
                <li><button>Services</button></li>
                <li><button>Skills</button></li>
            </ul>
        </div>
    )
}