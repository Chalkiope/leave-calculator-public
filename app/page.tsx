import Image from 'next/image'
import s from './page.module.css'
import BasicTable  from './components/basic-table/BasicTable'
import { StatsComponent } from './components/stats-component/StatsComponent'

export default function Home() {
  return (
    <main className={s.main}>
      <BasicTable />
      <StatsComponent />
    </main>
  )
}
