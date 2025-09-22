// HOME PAGE 
interface IdDesc{
    id: number,
    description: string,
}
interface FeatureCard extends IdDesc{
    title: string,
    isCompleted?:boolean
}

interface DriverCard extends IdDesc{
    name: string,
    age: number,
    rate: number,
    isAccepted?:boolean
}