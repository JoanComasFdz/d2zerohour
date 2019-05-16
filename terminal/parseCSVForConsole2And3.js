function parseCSVForConsole2And3() {
    // The variable containing the result.
    var result = {}

    // Split the CSV intto an array of rows.
    var combos = combosCsv.split(/\r\n|\n/)

    // Parse all rows
    for (let i = 0; i < combos.length; i++) {
        // Current row
        const row = combos[i]

        // Columns in the row.
        const columns = row.split(',')

        // Get the color of the room.
        const roomColor = columns[3].substring(0, columns[3].length-1)

        // Get the terminal number.
        const countToNumber = columns[3].length-1
        const inRoomTerminalNumber = columns[3][countToNumber]

        // Created readable terminal
        const roomAndTerminal = roomColor + ' ' + inRoomTerminalNumber

        var secondConsolePair = columns[1]
        var thirdConsolePair = columns[2]

        // If there is element yet created for the current pair
        if (!result[secondConsolePair])
        {
            // Create an object.
            result[secondConsolePair] = {}
        }

        // Add the combos to the data.
        result[secondConsolePair][thirdConsolePair] = roomAndTerminal
    }

    console.info(result) // The array looks like: data['1-2']['3-4'] = 'White 1'

    return result
}