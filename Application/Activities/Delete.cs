using MediatR;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.EntityFrameworkCore.Update.Internal;
using Persistence;

namespace Application;

public class Delete
{
    public class  Command: IRequest<Result<Unit>>
    {
        public Guid Id {get; set;}
    }

    public class Handler : IRequestHandler<Command,Result<Unit>>
    {
           private readonly DataContext _Context ;
        public Handler(DataContext context)
        {
            _Context = context;
        }

     

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _Context.Activities.FindAsync(request.Id);
            if(activity==null) return null;

            _Context.Remove(activity);
            var result  = await _Context.SaveChangesAsync()>0;

            if(!result) return Result<Unit>.Failure("Fail to delete the activity ");
            return Result<Unit>.Success(Unit.Value);

        }
    }

}
