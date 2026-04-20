export const galleryModes = ['Panorama', 'Cinema', 'Overhead', 'Showcase', 'Gallery', 'Standard']
export const categoryTabs = ['All', 'Portraits', 'Branding', 'Couples', 'Studio', 'Editorial', 'Fashion', 'Lifestyle', 'Fine Art']

const galleryFiles = [
  'artist.jpg',
  'blue-dress.jpg',
  'boots.jpg',
  'bridge-women.jpg',
  'brown-dress.jpg',
  'candid.jpg',
  'car-women.jpg',
  'casual.jpg',
  'cheetah.jpg',
  'cheetah-2.jpg',
  'cheetah-3.jpg',
  'collection.png',
  'confidence.jpg',
  'contemplate-women.jpg',
  'flame-dress.jpg',
  'flower.jpg',
  'group.jpg',
  'happy-women.jpg',
  'jeans.jpg',
  'jeans-ripped.jpg',
  'jeans-women.jpg',
  'jet.jpg',
  'jet-2.jpg',
  'looking-up-women.jpg',
  'man.jpg',
  'modern-black-white.jpg',
  'negris.jpg',
  'negris-2.jpg',
  'negris-3.jpg',
  'negris-4.jpg',
  'power.jpg',
  'power-2.jpg',
  'rain.jpg',
  'roses.jpg',
  'self.jpg',
  'self-port.jpg',
  'silver-dress.jpg',
  'wild-pants.jpg',
  'women.jpg',
  'women-6.jpg',
  'women-serious.jpg',
]

const titleOverrides = {
  'artist.jpg': 'Quiet Authority',
  'bridge-women.jpg': 'Held in Light',
  'candid.jpg': 'Candid Moment',
  'collection.png': 'Collection',
  'confidence.jpg': 'Confidence',
  'contemplate-women.jpg': 'Still Thought',
  'flower.jpg': 'Botanical Accent',
  'group.jpg': 'Collected Presence',
  'happy-women.jpg': 'Easy Joy',
  'looking-up-women.jpg': 'Looking Up',
  'modern-black-white.jpg': 'Monochrome Frame',
  'negris.jpg': 'Private Luxury',
  'negris-2.jpg': 'Toned Restraint',
  'negris-3.jpg': 'Editorial Line',
  'negris-4.jpg': 'Velvet Tension',
  'self-port.jpg': 'Self Portrait',
  'women-6.jpg': 'Flow State',
  'women-serious.jpg': 'Clear Intent',
}

function toTitleCase(value) {
  return value
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function inferCategories(fileName) {
  const name = fileName.toLowerCase()

  if (/(bridge|happy|candid|car-women|casual|rain|roses|collection|flower)/.test(name)) {
    return ['Lifestyle', 'Fine Art']
  }

  if (/(artist|confidence|contemplate|group|man|self|looking-up|women-serious|women\.jpg|self-port)/.test(name)) {
    return ['Portraits', 'Studio']
  }

  if (/(dress|boots|cheetah|flame|jeans|jet|negris|power|silver|wild-pants|modern-black-white)/.test(name)) {
    return ['Fashion', 'Editorial']
  }

  return ['Editorial', 'Branding']
}

export const galleryItems = galleryFiles.map((file, index) => {
  const title = titleOverrides[file] ?? toTitleCase(file)
  return {
    id: file.replace(/\.[^.]+$/, ''),
    src: `/photos/${file}`,
    alt: `${title} from Samuel Studio.`,
    title,
    categories: inferCategories(file),
    featured: index < 8 || ['collection.png', 'women-6.jpg', 'modern-black-white.jpg'].includes(file),
  }
})
