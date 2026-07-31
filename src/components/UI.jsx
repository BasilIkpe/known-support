import { Link } from 'react-router-dom';
export function Eyebrow({children}){return <p className="eyebrow">{children}</p>}
export function PageHero({eyebrow,title,copy,actions,children}){return <section className="page-hero"><div className="shell hero-grid"><div><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p className="lede">{copy}</p>{actions&&<div className="actions">{actions.map((a,i)=><Link key={a[0]} className={i?'button ghost':'button'} to={a[1]}>{a[0]}</Link>)}</div>}</div>{children}</div></section>}
export function Section({eyebrow,title,copy,children,id}){return <section className="section" id={id}><div className="shell"><div className="section-head"><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{copy&&<p>{copy}</p>}</div>{children}</div></section>}
export function Card({title,children,kicker}){return <article className="card">{kicker&&<span>{kicker}</span>}<h3>{title}</h3><p>{children}</p></article>}
export function Status({type='info',children}){return <div className={`status ${type}`}>{children}</div>}
export function Field({label,name,type='text',required=false,children,placeholder}){return <label className="field"><span>{label}{required?' *':''}</span>{children||<input name={name} type={type} required={required} placeholder={placeholder}/>}</label>}
export function Check({name,label,required=false}){return <label className="check"><input name={name} type="checkbox" required={required}/><span>{label}</span></label>}
