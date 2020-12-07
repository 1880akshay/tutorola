import React from 'react';

const Sort = ({children, by}) => {
    var type, title=false;
    var desc=false;
    if(by==='') type='id';
    else if(by==='pricel2h') type='price';
    else if(by==='priceh2l') {type='price'; desc=true;}
    else if(by==='ratingl2h') type='rating';
    else if(by==='ratingh2l') {type='rating'; desc=true;}
    else if(by==='titlea2z') title=true;
    else if(by==='titlez2a') {title=true; desc=true;}

    if(title) {
        if(desc) {
            return React.Children.toArray(children).sort((a, b) => {
                var titleA = JSON.parse(a.props.courseInfo.keywords)[0];
                var titleB = JSON.parse(b.props.courseInfo.keywords)[0];
                return (titleA < titleB) ? 1 : -1;
            });
        }
        return React.Children.toArray(children).sort((a, b) => {
            var titleA = JSON.parse(a.props.courseInfo.keywords)[0];
            var titleB = JSON.parse(b.props.courseInfo.keywords)[0];
            return (titleA > titleB) ? 1 : -1;
        });
    }
    if(desc)
        return React.Children.toArray(children).sort((a, b) => {
            return (a.props.courseInfo[type] < b.props.courseInfo[type]) ? 1 : -1;
        });
    return React.Children.toArray(children).sort((a, b) => {
        return (a.props.courseInfo[type] > b.props.courseInfo[type]) ? 1 : -1;
    });  
}

export default Sort;