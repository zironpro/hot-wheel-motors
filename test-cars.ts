import { getPayload } from 'payload'
import configPromise from './src/payload.config'

async function run() {
  const payload = await getPayload({ config: configPromise })
  const cars = await payload.find({ collection: 'cars' })
  console.log("Total cars:", cars.docs.length)
  cars.docs.forEach((car: any) => {
    console.log(`- ${car.make} ${car.model} | slug: ${car.slug} | id: ${car.id}`)
  })
}

run().catch(console.error).then(() => process.exit(0))
