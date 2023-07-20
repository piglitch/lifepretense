import { fetchAllProjects } from "@/lib/actions";
import { ProjectInterface } from '../common.type';
import ProjectCard from "@/components/ProjectCard";


type ProjectSearch = {
    projectSearch: {
        edges: { node: ProjectInterface }[];
        pageInfo: {
            hasPreviousPage: boolean;
            hasNextpage: boolean;
            startCursor: string;
            endCursor: string;
        }
    }
}

const Home = async () => {
    const data = await fetchAllProjects() as ProjectSearch;

    const projectstoDisplay = data?.projectSearch?.edges || [];
    if(projectstoDisplay.length === 0 ){
        return(
           <section className="flexStart flex-col paddings">
            Categories
                <img src="https://media2.giphy.com/media/l1huvMVWIzssw/giphy.gif?cid=ecf05e4759txywusaw9kcij10jgk74s7hz0k3u2gclcmm8pi&ep=v1_gifs_related&rid=giphy.gif&ct=g" alt="sunbath_lady" />
            <p className="no-result-text text-center">Nothing to see here yet.</p>
           </section> 
        )
    }
    return (
        <section className="flex-sart flex-col paddings mb-16">
            <h1>Categories</h1>
            <section className="projects-grid">
                {projectstoDisplay.map(({node} : { node: ProjectInterface }) => (
                    <ProjectCard 
                        key={node?.id}
                        id={node?.id}
                        image={node?.image}
                        title={node?.title}
                        name={node?.createdBy?.name}
                        avatarUrl={node?.createdBy?.avatarUrl}
                        userId={node?.createdBy?.id}
                    />
                ))}
            </section>
            <h1>LoadMore</h1>
        </section>
    )
}

export default Home;