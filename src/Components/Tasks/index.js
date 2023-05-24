import React, { useState } from "react"; 
import "../../Assets/Styles/Tasks.css";
import { Icon } from "@iconify/react";
export const Task = {
    List: ({children}) => {
        return(
            <div className="task-list">
                
                {children}
            </div>
        )
    },
    Item: ({}) => {
        const [priority, setPriority] = useState(false);

        return(
            <div className="task-item">
                <div className="task-header">
                    <span className="cat">category</span>
                    <div className="date">
                        <Icon icon="solar:calendar-line-duotone" width={20} />
                        <time>12/05/2023</time>
                    </div>
                </div>
                <div className="task-body">
                    <input type="checkbox" />
                    <p>Bake a cake with Debs</p>
                </div>
                <div className="task-footer">
                <span className="status">status</span>
                    <div>
                        <button onClick={() => setPriority(!priority)}>
                            <Icon icon={priority ? "ph:star-fill" : "ph:star-light"} width={20} className="priority" />
                        </button>
                        <button>
                            <Icon icon="lucide:edit" width={20} className="edit" />
                        </button>
                        <button>
                            <Icon icon="carbon:delete" width={20} className="delete" />
                        </button>
                    </div>
                    
                </div>
            </div>
        )
    }
}