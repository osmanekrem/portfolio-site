import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./styles.css"

export default function Category({token}) {

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")

    const getCategories = () => {
        axios.get(process.env.REACT_APP_API_BASE_URL+"/categories").then(res => {
            setCategories(res.data.categories)
        }).catch((error) => {
            console.log(error)
        })
    }

    const createCategory = async (e) => {
        e.preventDefault();
    
        const config = {
          headers: {
            'Authorization': `${token}`, // JWT'yi isteğe ekle
            'Content-Type': 'application/json'
          }
        };
    
        try {
          const response = await axios.post(process.env.REACT_APP_API_BASE_URL+'/categories', { name: category }, config);
          if(response.status===201){
            getCategories()
            setCategory("")
          }
        } catch (error) {
          console.error(error);
        }
      };

      const deleteCategory = (id) => {
        axios.post(process.env.REACT_APP_API_BASE_URL+`/categories/${id}?_method=DELETE`, {}, {
            headers: {
                'Authorization': token, // token, kullanıcının giriş yapması durumunda aldığı kimlik doğrulama anahtarıdır
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            // Kategori başarıyla silindiğinde, kategorileri güncellemek için categories state'ini yeniden yükleyebilirsiniz
            getCategories(); 
        })
        .catch(error => {
            console.error(error);
        });
      }

      

    useEffect(() => {
        getCategories()
    },[])

  return (
    <div className='categories'>
        <h4>Project Categories</h4>
        <ul>
            {
                categories.map((category, i) => (
                    <span key={i}>{category.name} <button onClick={() => deleteCategory(category._id)}><svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 48 48' height={24} width={24}><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg></button></span>
                ))
            }
        </ul>
        <form onSubmit={createCategory}>
            <input placeholder='name' value={category} onChange={e => setCategory(e.target.value)} />
            <button type='submit' className='add'>Add</button>
        </form>
    </div>
  )
}
