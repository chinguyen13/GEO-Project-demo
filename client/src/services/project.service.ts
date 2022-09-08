import http from "../http-common";

class ProjectDataService{

  getAll(){
    return http.get("/");
  }

  create(data:{
    code:number,
    name: string,
    type: string,
    status: number
  }){
    return http.post("/add", data);
  }

  update(data:{
    code:number,
    name: string,
    type: string,
    status: number
  }){
    return http.put(`/project/${data.code}`, data);
  }

  delete(code: number){
    return http.delete(`/${code}`);
  }

  findByTypeAndName(name: string,type: string)
  {
    return http.get(`/search/name=${name}/type=${type}`);
  }

  findByName(name: string)
  {
    return http.get(`/search/name=${name}`);
  }

  findByType(type: string)
  {
    return http.get(`/search/type=${type}`);
  }
};

export default new ProjectDataService();