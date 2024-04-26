import numpy as np

def filter(ins,outs):
   cls = ins['Classification']

   keep_classes = [1, 2]

   # Use the first test for our base array.
   keep = np.equal(cls, keep_classes[0])

   # For 1:n, test each predicate and join back
   # to our existing predicate array
   for k in range(1, len(keep_classes)):
       t = np.equal(cls, keep_classes[k])
       keep = keep + t

   outs['Mask'] = keep
   return True