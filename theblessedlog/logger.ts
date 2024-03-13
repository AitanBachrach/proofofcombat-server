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
    }
    
    error(message?: any, ...optionalParams: any[]): void {
        let logmessage = util.format(message, optionalParams);
    }

    chat(message?: any, ...optionalParams: any[]): void {
        let logmessage = formatting(message, optionalParams);
    }

}


export function formatting(message?: any, ...optionalParams: any[]): string {
    let formattedString : string = message.toString()
    optionalParams.forEach((e) => {
        formattedString = formattedString.concat(' ', e.toString())
    })
    return formattedString
}

/*
let testlogger : logger = new logger()
testlogger.start()
*/