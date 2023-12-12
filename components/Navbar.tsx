import { performRequest } from '@/lib/datocms';
import {Category} from "@/models/Category";
import Link from 'next/link'

const CAT_QUERY = `
  query AllCategories {
    allCategories {
    id
    title(locale: en)
    slug
   }
  }`;

export default async function Navbar(){
    const { data: { allCategories } } = await performRequest({ query: CAT_QUERY });
    return (
        <div className="nav">
            <div>
                <Link href={'/'}>Home page</Link>
            </div>
            {allCategories.map((cat: Category) => (
                <div key={cat.id}>
                    <Link href={`/category/${cat.slug}`}>{cat.title}</Link>
                </div>
            ))}
        </div>
    )
}