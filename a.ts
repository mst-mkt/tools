import { get_all_unicodes_list } from 'unicode-information'

const unicodes = get_all_unicodes_list().sort(({cp: a}, {cp: b}) => Number.parseInt(a, 16) - Number.parseInt(b, 16))
const generalCategories = [...new Set(unicodes.map((u) => u.blk))].map((blk) => `"${blk}"`).join(",")

console.log(generalCategories)
