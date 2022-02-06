import '../styles/Modal.scss';
import interact from 'interactjs'

interface IModalProps {
  children: React.ReactElement,
  closeModal: Function
}

const lastPosition = { x: document.documentElement.clientWidth / 2 - 150, y: document.documentElement.clientHeight / 2 - 220 }

function dragMoveListener (event: any) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

interact('.resize-drag')
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
      move (event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
      }
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 200, height: 300 }
      })
    ],

    inertia: true
  })
  .draggable({
    listeners: { move: dragMoveListener },
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ]
  })


export function Modal( { children, closeModal } : IModalProps ) {

  const handleClose = () => {  
    const rect = document.getElementById('modal-to-drag')?.getBoundingClientRect() as DOMRect;

    lastPosition.x = rect.left;
    lastPosition.y = rect.top;

    closeModal()
  };
  

    return (  
      <div className="modal-outer">
          <div className="modal-inner resize-drag" id="modal-to-drag" style={{ left: lastPosition.x, top: lastPosition.y}} >
            <div className="exit-btn" onClick={ handleClose }>X</div>

            {children}
          </div>
      </div>
    );
  }