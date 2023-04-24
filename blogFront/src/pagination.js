const  paginate = (data) =>  {

    let curr = data.meta.current_page;
    let last_page = data.meta.last_page;
    let pnt = [];
        pnt.push(curr);
        if (last_page > 3) {
            if (curr  < last_page) {
                pnt.push(curr+1)
                if (curr > 1) {

                        pnt.push(curr - 1)


                }
                else
                {

                        pnt.push(curr+2)


                }

            }
            else
            {
                pnt.push(curr-1)
                pnt.push(curr-2)
            }
        }else
        {
            pnt = [];
            for (let i = 1; i <= last_page; i++){
                pnt.push(i);

            }

        }



        pnt.sort((a,b) => {
            return a-b;
        });

        return [last_page, pnt];

}

export default paginate;
