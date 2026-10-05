export interface Slide {
  id: string;
  image: string;
  caption: string;
  captionBn: string;
}

export const slides: Slide[] = [
{
  id: 'sl-1',
  image: "/c50bd854-fa25-48f9-bd2f-33117e6cb87f.jpg",
  caption: 'Mongla Custom House, Bagerhat',
  captionBn: 'মোংলা কাস্টম হাউস, বাগেরহাট'
},
{
  id: 'sl-2',
  image: "/78285f55-65e0-4a29-89a9-dff5b536bc34.jpg",
  caption: 'Mongla Port — vessel berthing and container operations',
  captionBn: 'মোংলা বন্দর — জাহাজ বার্থিং ও কনটেইনার কার্যক্রম'
},
{
  id: 'sl-3',
  image: "/68dab1bd-4f0c-4ff9-b1af-f097c8608531.jpg",
  caption: "Mongla Customs Agents' Association general meeting",
  captionBn: 'মোংলা কাস্টমস্ এজেন্টস্ এসোসিয়েশনের সাধারণ সভা'
}];