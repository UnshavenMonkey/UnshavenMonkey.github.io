import React from "react"
import styles from "./someComponent.module.css"

export const UserCard = ({text}: {text: string}) => {
    return <div className={styles.someComponentClass}>
        {text}
    </div>
}


