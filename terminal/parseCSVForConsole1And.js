function parseCSVForConsole1And(secondConsoleNumber) {
    // The variable containing the result.
    var data = {}

    // Split the CSV intto an array of rows.
    var combos = combosCsv.split(/\r\n|\n/)

    // Parse all rows
    for (let i = 0; i < combos.length; i++) {
    // Current row
    const element = combos[i]

    // Columns in the row.
    const values = element.split(',')

    // Get the color of the room.
    const roomColor = values[3].substring(0, values[3].length-1)

    // Get the terminal number.
    const countToNumber = values[3].length-1
    const inRoomTerminalNumber = values[3][countToNumber]

    // Created readable terminal
    const roomAndTerminal = roomColor + ' ' + inRoomTerminalNumber

    // If there is no combo in the first level of the data
    if (!data[values[0]])
    {
        // Create an object.
        data[values[0]] = {}
    }

    // Add the combos to the data.
    const secondColumnIndex = secondConsoleNumber -1
    data[values[0]][values[secondColumnIndex]] = roomAndTerminal
    }

    console.info(data) // The array looks like: data['1-2']['3-4'] = 'White 1'

    return data
}