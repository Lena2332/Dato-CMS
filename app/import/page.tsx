'use client';
import { performClient } from '@/lib/datocmsimport'

export default async function Import(){

    return (
        <div className="content">
            <h1>Import</h1>
            <button
                onClick={performClient}
            >Import recipes</button>
        </div>
    )

}