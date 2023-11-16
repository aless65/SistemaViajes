namespace webapi.Repository
{
    public interface IRepository<T>
    {
        public ServiceResult List();    
        public ServiceResult Insert(T item);
        public ServiceResult Update(T item);
        public ServiceResult find(int? id);
        public ServiceResult Delete(T item);
    }
}
