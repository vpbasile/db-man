import { ReactNode } from 'react';

export default function Logo(props: { url: string, children?: ReactNode }): JSX.Element {
    return <div>
        <img src={props.url} className="h-20 p-3" />
        {props.children}
    </div>
}