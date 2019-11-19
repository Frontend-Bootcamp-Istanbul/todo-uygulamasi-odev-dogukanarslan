import React from 'react';

class RemoveAll extends React.Component {
  /*
  <button className="remove-all" onClick={() => {this.props.showOnlyImportant()}}>
    Önemlileri Göster
  </button>
  */
    render() {
        return (
          <div>
            <button className="remove-all" onClick={() => {this.props.onRemoveAll()}}>
              Tümünü Sil
            </button>



          </div>
      )
    }
}

export default RemoveAll;
