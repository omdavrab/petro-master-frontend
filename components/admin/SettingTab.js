import React from 'react'
import { faStore, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const tabs = [
    { id: 1, name: 'My Account', icon: faUser },
    { id: 2, name: 'Petro Master', icon: faStore },
    // { name: 'Team Members', icon: UsersIcon},
    // { name: 'Billing',  icon: CreditCardIcon },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const SettingTab = ({setSelectedTab , selectedtab}) => {
    return (
        <div className="border-b border-gray-200 dark:border-gray-600">
            <div className=" flex space-x-8" >
                {tabs.map((item) => {
                    return (
                        <button
                            key={item.id}
                            onClick={() => setSelectedTab(item.id)}
                            className={classNames(
                                selectedtab === item.id
                                    ? 'border-orange text-orange'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
                            )}
                        >
                            <FontAwesomeIcon icon={item.icon} className={classNames(
                                selectedtab === item.id ? 'text-orange' : 'text-gray-400 group-hover:text-gray-500',
                                '-ml-0.5 mr-2 h-5 w-5'
                            )} />

                            <span>{item.name}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default SettingTab
