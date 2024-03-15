import util from 'util'
import blessed, {Widgets} from 'blessed'


const screen: Widgets.Screen = blessed.screen({
    smartCSR: true
});
screen.key(['escape', 'q', 'C-c'], (ch, key) => {
    return process.exit(0);
});

const playerList : Widgets.ListElement = blessed.list({
    left: '80%',
    width: '20%',
    height: '100%',
    tags: true,
    label : "Players",
    border: {
      type: 'line'
    },
    content: 'Hello {bold}world{/bold}!',
    style: {
      border: {
        fg: '#f0f0f0'
      }
    }
  });

const chatBox : Widgets.ListElement = blessed.list({
    left: '30%',
    width: '50%',
    height: '100%',
    tags: true,
    label : "Chat",
    border: {
      type: 'line'
    },
    content: 'Hello {bold}world{/bold}!',
    style: {
      border: {
        fg: '#f0f0f0'
      }
    }
  });

const errorLog : Widgets.ListElement = blessed.list({
    left: '0%',
    top: '0%',
    width: '30%',
    height: '50%',
    tags: true,
    label : "Errors",
    border: {
      type: 'line'
    },
    content: 'Hello {bold}world{/bold}!',
    style: {
      border: {
        fg: '#f0f0f0'
      }
    }
  });

const miscLog : Widgets.ListElement = blessed.list({
    left: '0%',
    top: '50%',
    width: '30%',
    height: '50%',
    tags: true,
    label : "Everything Else",
    border: {
      type: 'line'
    },
    content: 'Hello {bold}world{/bold}!',
    style: {
      border: {
        fg: '#f0f0f0'
      }
    }
  });

export class logger {

    


    
    start() : void {
        screen.append(chatBox)
        screen.append(playerList)
        screen.append(errorLog)
        screen.append(miscLog)
        screen.render();
    }

    log(message?: any, ...optionalParams: any[]): void {
        let logmessage = util.format(message, optionalParams);
        let length_items = miscLog.add(logmessage)
        screen.render();
    }
    
    error(message?: any, ...optionalParams: any[]): void {
        let logmessage = util.format(message, optionalParams);
        let length_items = errorLog.add(logmessage)
        screen.render();
    }

    chat(message?: any, ...optionalParams: any[]): void {
        let logmessage = formatting(message, optionalParams);
        let length_items = chatBox.add(logmessage)
        //If we wanted to ever prune items we could do it here
        screen.render();
    }

    players(joined : boolean = true, playerName : string): void {
      let item_index = playerList.getItemIndex(playerName)
      if (item_index>-1 && !joined){
        playerList.removeItem(item_index)
      }
      else if (joined && item_index == -1){
        playerList.addItem(playerName)
      }
      screen.render();
    }
}


export function formatting(message?: any, ...optionalParams: any[]): string {
    let formattedString : string = message.toString()
    optionalParams.forEach((e) => {
        formattedString = formattedString.concat(' ', e.toString())
    })
    return formattedString
}

let testlogger : logger = new logger()
testlogger.start()

testlogger.players(true, "andy")
testlogger.players(true, "sally")
testlogger.players(false, "sally")
testlogger.players(true, "sally")
testlogger.players(true, "andy")
testlogger.players(false, "sally")
testlogger.players(true, "sally")
testlogger.players(false, "andy")