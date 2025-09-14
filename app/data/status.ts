import {
  MdAccessAlarm,
  MdAccountBalance,
  MdAudiotrack,
  MdBathtub,
  MdBedtime,
  MdBugReport,
  MdBuild,
  MdCake,
  MdCameraAlt,
  MdCatchingPokemon,
  MdCelebration,
  MdCleaningServices,
  MdCode,
  MdComputer,
  MdDirectionsBoat,
  MdDirectionsBus,
  MdDirectionsCar,
  MdDirectionsRun,
  MdDirectionsWalk,
  MdDownhillSkiing,
  MdEvent,
  MdFlatware,
  MdFlight,
  MdHiking,
  MdHouse,
  MdHowToVote,
  MdIceSkating,
  MdLocalTaxi,
  MdPedalBike,
  MdQuestionMark,
  MdRollerSkating,
  MdSchool,
  MdScubaDiving,
  MdShoppingCart,
  MdSportsEsports,
  MdSportsTennis,
  MdSubway,
  MdTheaters,
  MdTrain,
  MdTwoWheeler,
} from 'react-icons/md'

export const STATUS_TEXT_KEY = 'status_text'
export const STATUS_ICON_KEY = 'status_icon'

export const ICON_LIST = {
  Unknown: MdQuestionMark,
  // eslint-disable-next-line sort-keys
  Alarm: MdAccessAlarm,
  Audio: MdAudiotrack,
  Bank: MdAccountBalance,
  Bath: MdBathtub,
  Bedtime: MdBedtime,
  Bicycle: MdPedalBike,
  Bike: MdTwoWheeler,
  Boat: MdDirectionsBoat,
  Bug: MdBugReport,
  Build: MdBuild,
  Bus: MdDirectionsBus,
  Cake: MdCake,
  Camera: MdCameraAlt,
  Car: MdDirectionsCar,
  Celebration: MdCelebration,
  Cleaning: MdCleaningServices,
  Code: MdCode,
  Computer: MdComputer,
  Event: MdEvent,
  Flatware: MdFlatware,
  Flight: MdFlight,
  Game: MdSportsEsports,
  Hiking: MdHiking,
  House: MdHouse,
  IceSkate: MdIceSkating,
  Movie: MdTheaters,
  Pokemon: MdCatchingPokemon,
  RollerSkate: MdRollerSkating,
  Run: MdDirectionsRun,
  School: MdSchool,
  Scubadiving: MdScubaDiving,
  Shopping: MdShoppingCart,
  Skiing: MdDownhillSkiing,
  Subway: MdSubway,
  Taxi: MdLocalTaxi,
  Tennis: MdSportsTennis,
  Train: MdTrain,
  Vote: MdHowToVote,
  Walk: MdDirectionsWalk,
} as const
export type StatusIconList = keyof typeof ICON_LIST

export const isStatusIcon = (value: string): value is StatusIconList => {
  return Object.keys(ICON_LIST).includes(value)
}

export const getMyStatus = async (
  env: Env
): Promise<[StatusIconList, string]> => {
  const statusText = await env.STATUS.get(STATUS_TEXT_KEY, 'text')
  const statusIcon = await env.STATUS.get(STATUS_ICON_KEY, 'text')
  const icon = statusIcon && isStatusIcon(statusIcon) ? statusIcon : 'Unknown'
  return [icon, statusText ?? 'Unknown Status']
}

export const setStatusIcon = async (env: Env, statusIcon: StatusIconList) => {
  await env.STATUS.put(STATUS_ICON_KEY, statusIcon)
}

export const setStatusText = async (env: Env, statusText: string) => {
  await env.STATUS.put(STATUS_TEXT_KEY, statusText)
}
