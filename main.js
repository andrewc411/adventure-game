const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-btns");

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode =  textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button);
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: "You wake up in a strange place and see a jar of blue goo near you.",
        options: [
            {
                text: "You take the jar of blue goo",
                setState: { blueGoo: true },
                nextText: 2
            },
            {
                text: "You leave the jar of blue goo",
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "You venture forth in search of answers to where you are when you come across a merchant.",
        options: [
            {
                text: "You trade the goo for a sword.",
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, sword: true},
                nextText: 3
            },
            {
                text: "You trade the goo for a shield.",
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, shield: true},
                nextText: 3
            },
            {
                text: "Ignore the merchant.",
                nextText: 3
            },
        ]
    },
    {
        id: 3,
        text: "After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.",
        options: [
            {
                text: "Explore the castle",
                nextText: 4
            },
            {
                text: "Find a room to sleep at in the town.",
                nextText: 5
            },
            {
                text: "Find some hay in a stable to sleep in.",
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: "You are so tired that you fall asleep while exploring the castle and you are killed when a terrible monster finds you.",
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: "You don't have money for a room and are thrown in jail.",
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: "You find a stable to sleep in and are well rested when a horse eating the hay wakes you after mistaking your hair for its breakfast",
        options: [
            {
                text: "You are quick to anger and punch the horse in the nose.",
                nextText: 7
            },
            {
                text: "You leave the stable and head towards the castle.",
                nextText: 8
            },
            {
                text: "Steal the horse.",
                setState: { horse: true },
                nextText: 9

            }
        ]
    },
    {
        id: 7,
        text: "The horse squeals and alerts a young farmer's boy who comes at you with a pitchfork.",
        options: [
            {
                text: "You use your shield to protect yourself.",
                requiredState: (currentState) => currentState.shield,
                nextText: 10
            },
            {
                text: "You unsheathe your sword and stab the bastard.",
                requiredState: (currentState) => currentState.sword,
                nextText: 11

            },
            {
                text: "Flash your sword and tell the boy you don't want trouble.",
                requiredState: (currentState) => currentState.sword,
                nextText: 10

            },
            {
                text: "Run away.",
                nextText: 12
            }
        ]
    },
    {
        id: 8,
        text: "You are almost at the castle when you are met by a skilled warrior.",
        options: [
            {
                text: "Challenge the warrior to a duel.",
                requiredState: (currentState) => currentState.sword || currentState.shield,
                nextText: 13
            },
            {
                text: "He acknowledges you and offers to train you. You accept...",
                requiredState: (currentState) => currentState.shield || currentState.sword,
                nextText: 14
            },
            {
                text: "He acknowledges you and offers to train you. You decline...",
                requiredState: (currentState) => currentState.shield || currentState.sword,
                nextText: 15
            },
            {
                text: "Avoid the warrior. Try not to disturb him.",
                nextText: 15
            }
        ]
    },
    {
        id: 9,
        text: "You take off into the rising sun with your new friend. This will be the greatest adventure! With the wind rushing through your hair your horse gets thirsty as you come upon a river with a bridge to cross.",
        options: [
            {
                text: "Stop at the river for your horse to drink.",
                nextText: 16
            },
            {
                text: "Cross the bridge without stopping.",
                nextText: 17
            }
        ]
    },
]

startGame();