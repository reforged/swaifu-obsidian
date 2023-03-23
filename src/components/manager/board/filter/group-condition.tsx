import {useState} from "react";
import DeleteGroup from "./buttons/group/delete-group";
import {ConditionGroupContract, ConditionContract} from "./types";
import GroupAddCondition from "./buttons/group/group-add-condition";
import Condition from "./condition";
import SelectConjunction from "./select-menus/select-conjunction";

type Props = {
  condition: ConditionGroupContract
}

export default function GroupCondition ({ condition }: Props) {
  const [conjunction, setConjunction] = useState<'and' | 'or'>('and')

  return (
    <div className="bg-gray-50 rounded-sm border p-4 w-full">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          { conjunction === 'and'
            ? <span> All of the following are true…</span>
            : <span>All of the following are true…</span>
          }
        </div>

        <div className="flex items-center gap-2">
          <GroupAddCondition condition={condition} />
          <DeleteGroup condition={condition} />
        </div>
      </div>
      <div className="pt-4">
        { condition && condition.conditions.length
          ? <div className="flex flex-col gap-2">
            { condition.conditions.map((item, index) => (
              <div key={item.uid}>
                <div className="flex items-start gap-2">
                  <div className="w-24">
                    { index === 0
                      ? <div className="pl-3">Where</div>
                      : index === 1
                        ? <div>
                          <SelectConjunction condition={condition} />
                        </div>
                        : <div className="text-gray-600 pl-3">
                          {condition.conjunction === 'and'
                            ? <span>And</span>
                            : <span>Or</span>
                          }
                        </div>
                    }
                  </div>
                  <div className="w-full">
                    <Condition condition={item as ConditionContract} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          : <span className="text-gray-400">No filter conditions are applied to this view</span>
        }
      </div>
    </div>
  )
}