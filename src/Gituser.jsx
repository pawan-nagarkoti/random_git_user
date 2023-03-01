import React, { useEffect, useState } from 'react'

const Gituser = () => {
    const url = 'https://randomuser.me/api/';
    const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg';
    const [gitPerson, setGitPerson] = useState();
    const [hoverUser, setHoverUser] = useState();
    const [titleName, setTitleName] = useState('Name');
    const [defaulName, setDefaultName] = useState(null);
    const [loader, setLoader] = useState(true);

    const getRandomPerson = () => {
        gitUser();
    }
    const gitUser = async () => {
        const data = await fetch(url).then((response) => response.json()).then((data) => data);
        const person = data.results[0];
        const nameContainer = `${person.name.title} ${person.name.first} ${person.name.last}`;
        setDefaultName(nameContainer)
        setGitPerson([person])
    }
    useEffect(() => {
        gitUser();
    }, []);

    const handleMouseHover = (e, itemName, item, ...value) => {
        setHoverUser([itemName, item, ...value]);
        setTitleName(e.target.dataset.label);
        setLoader(false)
    }

    if (!gitPerson) return 'Loading...';


    return (
        <div>
            {
                gitPerson.map(({ email, name: { first, last, title }, phone, dob: { age }, login: { password }, location: { street: { name } }, picture: { medium } }, index) =>
                    <div key={index}>
                        <img src={medium || defaultImage} alt={title} />
                        <div>{titleName}</div>
                        {
                            loader && <p>{defaulName}</p>
                        }
                        {
                            !loader &&
                            <div style={{ display: 'flex', gap: '.7rem' }}>
                                {
                                    hoverUser?.map((item, index) =>
                                        <p key={index}>{item}</p>
                                    )
                                }
                            </div>
                        }
                        <hr />
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <p data-label='Name' onMouseOver={(e) => handleMouseHover(e, title, first, last)}>Name : {title} {first} {last}</p>
                            <p data-label='Gmail' onMouseOver={(e) => handleMouseHover(e, email)}>Gmail : {email}</p>
                            <p data-label='Age' onMouseOver={(e) => handleMouseHover(e, age)}>Age : {age}</p>
                            <p data-label='Street' onMouseOver={(e) => handleMouseHover(e, name)}>Street : {name}</p>
                            <p data-label='Phone' onMouseOver={(e) => handleMouseHover(e, phone)}>PhoneNumber : {phone}</p>
                            <p data-label='Password' onMouseOver={(e) => handleMouseHover(e, password)}>Password : {password}</p>
                        </div>
                        <button onClick={gitPerson ? getRandomPerson : 'Loading...'}>Random User</button>
                    </div>
                )
            }
        </div>
    )
}

export default Gituser