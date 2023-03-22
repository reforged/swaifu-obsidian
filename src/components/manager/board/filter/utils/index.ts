import {
  ConditionContract,
  ConditionGroupContract,
  ConjuctionContract,
  CoupleConditionContract
} from "../types";

export function isGroup (item: CoupleConditionContract) {
  return !!(item as ConditionGroupContract).conjunction;
}

export function UpdateConjunction (condition: ConditionGroupContract, id: string, value: ConjuctionContract) {
  return {
    uid: condition.uid,
    conjunction: condition.uid === id ? value : condition.conjunction,
    conditions: condition.uid === id ? condition.conditions : condition.conditions.map((item) => {
      console.log("TEST", item.uid, id)
      if (item.uid === id) {
        return {
          uid: item.uid,
          conjunction: value,
          conditions: (item as ConditionGroupContract).conditions
        }
      }
      return item
    })
  } as ConditionGroupContract
}

export function UpdateRow (conditions: CoupleConditionContract[], condition: ConditionContract, data: ConditionContract) {
  const liste = [] as CoupleConditionContract[]


  conditions.forEach((item) => {
    if (isGroup(item)) {
      const sub = (item as ConditionGroupContract).conditions.map((subitem) => {
        if (subitem.uid !== condition.uid) return subitem

        return data
      })

      const group: ConditionGroupContract = {
        ...(item as ConditionGroupContract),
        conditions: sub
      }

      liste.push(group)
    } else {
      if (item.uid !== condition.uid) liste.push(item)
      else {
        liste.push(data)
      }
    }
  })

  return liste
}