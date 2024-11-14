import {
  type BindValue,
  Database,
} from 'https://deno.land/x/sqlite3@0.12.0/mod.ts'

type effectivity = {
  name: string
  space: number
  oneAtmosphere: number
}

type Thruster = {
  name: string
  maxThrust: number
  powerConsumption: number
  largeGrid: boolean
  effectivity: effectivity
}

const db = new Database('data.db')

const effectivities = {
  Atmospheric: {
    name: 'Atmospheric',
    space: 0,
    oneAtmosphere: 1,
  },
  Ion: {
    name: 'Ion',
    space: 1,
    oneAtmosphere: 0,
  },
  Hydrogen: {
    name: 'Hydrogen',
    space: 2,
    oneAtmosphere: 0,
  },
}

const atmosphericThrustersSmallGrid: Thruster[] = [
  {
    name: 'Atmospheric Thruster',
    maxThrust: 96,
    powerConsumption: 600,
    largeGrid: false,
    effectivity: effectivities.Atmospheric,
  },
  {
    name: 'Large Atmospheric Thruster',
    maxThrust: 576,
    powerConsumption: 2400,
    largeGrid: false,
    effectivity: effectivities.Atmospheric,
  },
  {
    name: 'Flat Atmospheric Thruster (Both)',
    maxThrust: 32,
    powerConsumption: 200,
    largeGrid: false,
    effectivity: effectivities.Atmospheric,
  },
  {
    name: 'Large Flat Atmospheric Thruster (Both)',
    maxThrust: 230,
    powerConsumption: 1000,
    largeGrid: false,
    effectivity: effectivities.Atmospheric,
  },
]

const ionThrustersSmallGrid: Thruster[] = [
  {
    name: 'Ion Thruster',
    maxThrust: 14.4,
    powerConsumption: 200,
    largeGrid: false,
    effectivity: effectivities.Ion,
  },
  {
    name: 'Large Ion Thruster',
    maxThrust: 172.8,
    powerConsumption: 2400,
    largeGrid: false,
    effectivity: effectivities.Ion,
  },
]

const hydrogenThrustersSmallGrid: Thruster[] = [
  {
    name: 'Hydrogen Thruster',
    maxThrust: 98.4,
    powerConsumption: 80.33,
    largeGrid: false,
    effectivity: effectivities.Hydrogen,
  },
  {
    name: 'Large Hydrogen Thruster',
    maxThrust: 480,
    powerConsumption: 385.6,
    largeGrid: false,
    effectivity: effectivities.Hydrogen,
  },
]

const atmosphericThrustersLargeGrid: Thruster[] = [
  {
    name: 'Atmospheric Thruster',
    maxThrust: 648,
    powerConsumption: 2400,
    largeGrid: true,
    effectivity: effectivities.Atmospheric,
  },

  {
    name: 'Large Atmospheric Thruster',
    maxThrust: 6480,
    powerConsumption: 16800,
    largeGrid: true,
    effectivity: effectivities.Atmospheric,
  },
  {
    name: 'Flat Atmospheric Thruster (Both)',
    maxThrust: 200,
    powerConsumption: 800,
    largeGrid: true,
    effectivity: effectivities.Atmospheric,
  },
  {
    name: 'Large Flat Atmospheric Thruster (Both)',
    maxThrust: 2600,
    powerConsumption: 6700,
    largeGrid: true,
    effectivity: effectivities.Atmospheric,
  },
]

const ionThrustersLargeGrid: Thruster[] = [
  {
    name: 'Ion Thruster',
    maxThrust: 345.6,
    powerConsumption: 3360,
    largeGrid: true,
    effectivity: effectivities.Ion,
  },
  {
    name: 'Large Ion Thruster',
    maxThrust: 4320,
    powerConsumption: 33600,
    largeGrid: true,
    effectivity: effectivities.Ion,
  },
]

const hydrogenThrustersLargeGrid: Thruster[] = [
  {
    name: 'Hydrogen Thruster',
    maxThrust: 1080,
    powerConsumption: 803.34,
    largeGrid: true,
    effectivity: effectivities.Hydrogen,
  },
  {
    name: 'Large Hydrogen Thruster',
    maxThrust: 7200,
    powerConsumption: 4820.05,
    largeGrid: true,
    effectivity: effectivities.Hydrogen,
  },
]

const thrustersCombined = [
  ...atmosphericThrustersSmallGrid,
  ...ionThrustersSmallGrid,
  ...hydrogenThrustersSmallGrid,
  ...atmosphericThrustersLargeGrid,
  ...ionThrustersLargeGrid,
  ...hydrogenThrustersLargeGrid,
]

createDB(db)

function resetDB(database: Database): void {
  database.exec('DROP TABLE IF EXISTS thrusters')
  database.exec('DROP TABLE IF EXISTS effectivities')
}

function createDB(database: Database): void {
  resetDB(database)

  const effectivitiesTable =
    `CREATE TABLE IF NOT EXISTS effectivities (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, space FLOAT, oneAtmosphere FLOAT)`
  database.exec(effectivitiesTable)

  const thrustersTable =
    'CREATE TABLE IF NOT EXISTS thrusters (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, maxThrust Float, powerConsumption Float, largeGrid BOOLEAN, effectivityId INTEGER, FOREIGN KEY(effectivityId) REFERENCES effectivities(id))'
  database.exec(thrustersTable)

  insert(
    database,
    'effectivities',
    ['name', 'space', 'oneAtmosphere'],
    [
      [
        effectivities.Atmospheric.name,
        effectivities.Atmospheric.space,
        effectivities.Atmospheric.oneAtmosphere,
      ],
      [
        effectivities.Ion.name,
        effectivities.Ion.space,
        effectivities.Ion.oneAtmosphere,
      ],
      [
        effectivities.Hydrogen.name,
        effectivities.Hydrogen.space,
        effectivities.Hydrogen.oneAtmosphere,
      ],
    ],
  )

  const effectivityIds = select(database, 'effectivities', ['id, name'])

  insert(
    database,
    'thrusters',
    ['name', 'maxThrust', 'powerConsumption', 'largeGrid', 'effectivityId'],
    thrustersCombined.map((thruster) => [
      thruster.name,
      thruster.maxThrust,
      thruster.powerConsumption,
      thruster.largeGrid,
      effectivityIds.find((effectivity) => {
        return effectivity.name === thruster.effectivity.name
      })?.id,
    ]),
  )
}

function insert(
  database: Database,
  table: string,
  columns: string[],
  values: Array<BindValue[]>,
): void {
  const columnLength = columns.length
  const valueLength = values.length
  if (columnLength === 0 || valueLength === 0) {
    throw new Error('Columns and values must have at least one element')
  }

  if (columnLength !== values[0].length) {
    throw new Error('Columns and values must have the same length')
  }

  for (let index = 0; index < valueLength - 1; index++) {
    if (values[index].length !== values[index + 1].length) {
      throw new Error('All values must have the same length')
    }
  }

  for (let index = 0; index < valueLength; index++) {
    database.exec(
      `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${
        '?,'.repeat(
          columnLength - 1,
        )
      }?)`,
      ...values[index],
    )
  }
}

function select(
  database: Database,
  table: string,
  columns: string[],
  where?: string,
  orderBy?: string,
  limit?: number,
): Array<{ [key: string]: BindValue }> {
  const columnLength = columns.length
  if (columnLength === 0) {
    throw new Error('Columns must have at least one element')
  }

  const query = `SELECT ${columns.join(', ')} FROM ${table}${
    where ? ` WHERE ${where}` : ''
  }${orderBy ? ` ORDER BY ${orderBy}` : ''}${limit ? ` LIMIT ${limit}` : ''}`

  const result = database.prepare(query).all()

  const rows = []
  for (const row of result) {
    rows.push(row)
  }

  return rows
}
